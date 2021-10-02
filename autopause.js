import config from './config'
import Api from './api'

process.chdir(__dirname)

const spawn = require('spawn-please')
const fs = require('fs/promises')
const moment = require('moment')
const chokidar = require('chokidar')

const sleep = time => new Promise(resolve => setTimeout(resolve, time))

;(() => {
  const _consoleLog = console.log
  console.log = (...args) => {
    _consoleLog(moment().format('hh:mm:ssA'), ...args)
  }
})()

;(async () => {
  const api = new Api(config)

  await api.getTime()
  console.log('Server time: ', api.time)

  const switchMiner = (() => { // anything to avoid scope pollution lol
    let mostRecent
    async function switchMiner (action) {
      if (action === mostRecent) return false

      spawn(config.afterburner.path, [config.afterburner.profiles[action]])

      try {
        await api.post('/main/api/v2/mining/rigs/status2', {
          body: {
            action,
            rigId: config.rigId
          }
        })
        console.log('Miner', action, 'successful')
        mostRecent = action
        return true
      } catch {
        console.log('Miner', action, 'failed! Retrying.')
        return switchMiner(action)
      }
    }
    return switchMiner
  })()

  async function listOfRunningProcesses () {
    const tasklist = (await spawn('tasklist'))
      .split('\r\n')
      .map(
        line => line.split(' ')[0]
      )
    return tasklist
  }

  spawn(config.nhmPath)

  async function listWatchedProcesses () {
    return (await fs.readFile('processes.cfg'))
      .toString()
      .split('\r').join('') // strip all \r
      .split('\n')
      .map(line => line
        .split('#')[0]
        .trim()
      )
  }

  let pauseFor = await listWatchedProcesses()
  console.log('Loaded watched processes')
  chokidar.watch('processes.txt').on('change', async () => {
    pauseFor = await listWatchedProcesses()
    console.log('Reloaded watched processes')
  })

  while (true) {
    const runningProcesses = await listOfRunningProcesses()
    let paused = false
    for (const process of runningProcesses) {
      if (pauseFor.includes(process)) {
        await switchMiner('STOP')
        paused = true
        break
      }
    }
    if (!paused) {
      await switchMiner('START')
    }
    await sleep(1000)
  }
})()
