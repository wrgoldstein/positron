#
# Top-level component that manages the section tool & the various individual
# section components that get rendered.
#

React = require 'react'
SectionContainer = React.createFactory require '../section_container/index.coffee'
SectionTool = React.createFactory require '../section_tool/index.coffee'
{ div } = React.DOM

module.exports = React.createClass

  getInitialState: ->
    { editingIndex: null }

  componentDidMount: ->
    @props.sections.on 'add remove reset', => @forceUpdate()
    @props.sections.on 'add', @onNewSection

  componentDidUpdate: ->
    $(@getDOMNode()).find('.scribe-marker').remove()

  onSetEditing: (i) ->
    @setState editingIndex: i

  onNewSection: (section) ->
    @setState editingIndex: @props.sections.indexOf section

  convertImages: (section) ->
    newSection = {
      type: 'image_collection'
      layout: section.get('layout') || 'overflow_fillwidth'
      images: [ {
        type: section.get('type')
        url: section.get('url')
        caption: section.get('caption')
      } ]
    }
    section.attributes = newSection
    return section

  convertArtworks: (section) ->
    artworks = section.get('artworks').map (artwork, i) ->
      artwork.type = 'artwork'
      return artwork
    newSection = {
      type: 'image_collection'
      layout: section.get('layout') || 'overflow_fillwidth'
      images: artworks
    }
    section.attributes = newSection
    return section

  render: ->
    div {},
      div {
        className: 'edit-section-list' +
          (if @props.sections.length then ' esl-children' else '')
        ref: 'sections'
      },
        SectionTool { sections: @props.sections, index: -1 }
        @props.sections.map (section, i) =>
          if section.get('type') is 'image'
            section = @convertImages section
          if section.get('type') is 'artworks'
            @convertArtworks section
          [
            SectionContainer {
              sections: @props.sections
              section: section
              index: i
              editing: @state.editingIndex is i
              ref: 'section' + 1
              key: section.cid
              onSetEditing: @onSetEditing
            }
            SectionTool { sections: @props.sections, index: i }
          ]
