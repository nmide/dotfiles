
# Theme settings
# -----------------------

root = document.documentElement

module.exports =
  config:
    fontSize:
      title: 'Font Size'
      description: 'Change the UI font size. Needs to be between 8 and 20.'
      type: ['integer', 'string']
      minimum: 8
      maximum: 20
      default: 'Auto'
    layoutMode:
      title: 'Layout Mode'
      description: 'In Auto mode, the UI will automatically adapt based on the window size.'
      type: 'string'
      default: 'Auto'
      enum: [
        'Compact'
        'Auto'
        'Spacious'
      ]

  activate: (state) ->
    # Handle settings changes
    atom.config.onDidChange 'light-bint-ui.fontSize', ->
      setFontSize(atom.config.get('light-bint-ui.fontSize'))
    atom.config.onDidChange 'light-bint-ui.layoutMode', ->
      setLayoutMode(atom.config.get('light-bint-ui.layoutMode'))

    # Initialize
    setFontSize(atom.config.get('light-bint-ui.fontSize'))
    setLayoutMode(atom.config.get('light-bint-ui.layoutMode'))

  deactivate: ->
    unsetFontSize()
    unsetLayoutMode()


# Font Size -----------------------
setFontSize = (currentFontSize) ->
  if Number.isInteger(currentFontSize)
    root.style.fontSize = "#{currentFontSize}px"
  else if currentFontSize is 'Auto'
    unsetFontSize()

unsetFontSize = ->
  root.style.fontSize = ''


# Layout Mode -----------------------
setLayoutMode = (layoutMode) ->
  root.setAttribute('theme-light-bint-ui-layoutmode', layoutMode.toLowerCase())

unsetLayoutMode = ->
  root.removeAttribute('theme-light-bint-ui-layoutmode')
