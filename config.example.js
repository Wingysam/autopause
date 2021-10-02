export default {
  apiHost: 'https://api2.nicehash.com',
  apiKey: '', // get it here: https://new.nicehash.com/my/settings/keys
  apiSecret: '',
  orgId: '',
  rigId: '',
  nhmPath: 'C:\\Users\\<Put your user folder here>\\AppData\\Local\\Programs\\NiceHash Miner\\NiceHashMiner.exe',
  afterburner: {
    path: 'C:\\Program Files (x86)\\MSI Afterburner\\MSIAfterburner.exe',
    profiles: {
      START: '-profile2', // make two afterburner profiles, set the first one to 100% limit (or what you want for gaming)
      STOP: '-profile1' // and set the second one to 70% (or what you want for mining)
    }
  }
}
