'use strict'

process.on('SIGINT', () => {
  const { exec } = require('child_process')
  exec('pm2 delete all')
})

module.exports = {
  apps: [
    {
      name: `projectname-${process.env.NODE_ENV} (REPLACE)`,
      script: './server/index.js',
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss:SSS',
      min_uptime: 10000, // 10 seconds
      max_restarts: 3,
      max_memory_restart: '1G', // will restart if memory uses 3GB
      // node_args: isLocal() ? ['--inspect=7000'] : [],
    },
  ],
}
