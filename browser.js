if (typeof biojs === 'undefined') {
  biojs = {} //Creates namespace biojs
}

if (typeof biojs === 'undefined') {
  module.exports = biojs.vis  = {} //Creates namespace biojs.io
}

biojs.vis.msa = require('biojs-vis-msa')
//biojs.vis.tree = require('biojs-vis-tree')
biojs.vis.chromosome = require('biojs-vis-chromosome')
//biojs.vis.tooltip = require('biojs-vis-tooltip')
biojs.vis.sequence = require('biojs-vis-sequence')
biojs.vis.easy_features = require('biojs-vis-easy_features')
