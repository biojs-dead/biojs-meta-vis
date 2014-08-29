if (typeof biojs === 'undefined') {
  biojs = {} //Creates namespace biojs
}

if (typeof biojs === 'undefined') {
  module.exports = biojs.io = {} //Creates namespace biojs.io
}

biojs.io.fasta = require('biojs-io-fasta')
biojs.io.clustal = require('biojs-io-clustal')
biojs.io.newick = require('biojs-io-newick')
biojs.io.graduates = require('biojs-io-graduates')
