(function() {
  module.exports = {
    makeAsciidocBlocks: function(languages, debug) {
      var codeBlocks;
      if (debug == null) {
        debug = false;
      }
      codeBlocks = languages.map(function(lang) {
        return {
          name: "markup.code." + lang.code + ".asciidoc",
          begin: "(?=(?>(?:^\\[(source)(?:,|#)\\p{Blank}*(?i:(" + lang.pattern + "))((?:,|#)[^\\]]+)*\\]$)))",
          patterns: [
            {
              match: "^\\[(source)(?:,|#)\\p{Blank}*(?i:(" + lang.pattern + "))((?:,|#)([^,\\]]+))*\\]$",
              captures: {
                0: {
                  name: 'markup.heading.asciidoc',
                  patterns: [
                    {
                      include: '#block-attribute-inner'
                    }
                  ]
                }
              }
            }, {
              include: '#inlines'
            }, {
              include: '#block-title'
            }, {
              comment: 'listing block',
              begin: '^(-{4,})\\s*$',
              contentName: "" + lang.type + ".embedded." + lang.code,
              patterns: [
                {
                  include: '#block-callout'
                }, {
                  include: '#include-directive'
                }, {
                  include: "" + lang.type + "." + lang.code
                }
              ],
              end: '^(\\1)$'
            }, {
              comment: 'open block',
              begin: '^(-{2})\\s*$',
              contentName: "" + lang.type + ".embedded." + lang.code,
              patterns: [
                {
                  include: '#block-callout'
                }, {
                  include: '#include-directive'
                }, {
                  include: "" + lang.type + "." + lang.code
                }
              ],
              end: '^(\\1)$'
            }, {
              comment: 'literal block',
              begin: '^(\\.{4})\\s*$',
              contentName: "" + lang.type + ".embedded." + lang.code,
              patterns: [
                {
                  include: '#block-callout'
                }, {
                  include: '#include-directive'
                }, {
                  include: "" + lang.type + "." + lang.code
                }
              ],
              end: '^(\\1)$'
            }
          ],
          end: '((?<=--|\\.\\.\\.\\.)[\\r\\n]+$|^\\p{Blank}*$)'
        };
      });
      codeBlocks.push({
        begin: '(?=(?>(?:^\\[(source)((?:,|#)[^\\]]+)*\\]$)))',
        patterns: [
          {
            match: '^\\[(source)((?:,|#)([^,\\]]+))*\\]$',
            captures: {
              0: {
                name: 'markup.heading.asciidoc',
                patterns: [
                  {
                    include: '#block-attribute-inner'
                  }
                ]
              }
            }
          }, {
            include: '#inlines'
          }, {
            include: '#block-title'
          }, {
            comment: 'listing block',
            name: 'markup.raw.asciidoc',
            begin: '^(-{4,})\\s*$',
            patterns: [
              {
                include: '#block-callout'
              }, {
                include: '#include-directive'
              }
            ],
            end: '^(\\1)$'
          }, {
            comment: 'open block',
            name: 'markup.raw.asciidoc',
            begin: '^(-{2})\\s*$',
            patterns: [
              {
                include: '#block-callout'
              }, {
                include: '#include-directive'
              }
            ],
            end: '^(\\1)$'
          }, {
            comment: 'literal block',
            name: 'markup.raw.asciidoc',
            begin: '^(\\.{4})\\s*$',
            patterns: [
              {
                include: '#block-callout'
              }, {
                include: '#include-directive'
              }
            ],
            end: '^(\\1)$'
          }
        ],
        end: '((?<=--|\\.\\.\\.\\.)[\\r\\n]+$|^\\p{Blank}*$)'
      });
      codeBlocks.push({
        name: 'markup.raw.asciidoc',
        begin: '^(-{4,})\\s*$',
        beginCaptures: {
          0: {
            name: 'support.asciidoc'
          }
        },
        patterns: [
          {
            include: '#block-callout'
          }, {
            include: '#include-directive'
          }
        ],
        end: '^(\\1)$',
        endCaptures: {
          0: {
            name: 'support.asciidoc'
          }
        }
      });
      if (debug) {
        console.log(CSON.stringify(codeBlocks));
      }
      return codeBlocks;
    },
    makeMarkdownBlocks: function(languages, debug) {
      var codeBlocks;
      if (debug == null) {
        debug = false;
      }
      codeBlocks = languages.map(function(lang) {
        return {
          name: "markup.code." + lang.code + ".asciidoc",
          begin: "^\\s*(`{3,})\\s*(?i:(" + lang.pattern + "))\\s*$",
          beginCaptures: {
            0: {
              name: 'support.asciidoc'
            }
          },
          contentName: "" + lang.type + ".embedded." + lang.code,
          patterns: [
            {
              include: '#block-callout'
            }, {
              include: "" + lang.type + "." + lang.code
            }
          ],
          end: '^\\s*\\1\\s*$',
          endCaptures: {
            0: {
              name: 'support.asciidoc'
            }
          }
        };
      });
      codeBlocks.push({
        name: 'markup.raw.asciidoc',
        begin: '^\\s*(`{3,}).*$',
        beginCaptures: {
          0: {
            name: 'support.asciidoc'
          }
        },
        patterns: [
          {
            include: '#block-callout'
          }
        ],
        end: '^\\s*\\1\\s*$',
        endCaptures: {
          0: {
            name: 'support.asciidoc'
          }
        }
      });
      if (debug) {
        console.log(CSON.stringify(codeBlocks));
      }
      return codeBlocks;
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9saWIvY29kZS1ibG9jay1nZW5lcmF0b3IuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQ0E7QUFBQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBRUU7QUFBQSxJQUFBLGtCQUFBLEVBQW9CLFNBQUMsU0FBRCxFQUFZLEtBQVosR0FBQTtBQUVsQixVQUFBLFVBQUE7O1FBRjhCLFFBQVE7T0FFdEM7QUFBQSxNQUFBLFVBQUEsR0FBYSxTQUFTLENBQUMsR0FBVixDQUFjLFNBQUMsSUFBRCxHQUFBO2VBQ3pCO0FBQUEsVUFBQSxJQUFBLEVBQU8sY0FBQSxHQUFjLElBQUksQ0FBQyxJQUFuQixHQUF3QixXQUEvQjtBQUFBLFVBQ0EsS0FBQSxFQUFRLDhDQUFBLEdBQThDLElBQUksQ0FBQyxPQUFuRCxHQUEyRCw0QkFEbkU7QUFBQSxVQUVBLFFBQUEsRUFBVTtZQUNSO0FBQUEsY0FBQSxLQUFBLEVBQVEscUNBQUEsR0FBcUMsSUFBSSxDQUFDLE9BQTFDLEdBQWtELDRCQUExRDtBQUFBLGNBQ0EsUUFBQSxFQUNFO0FBQUEsZ0JBQUEsQ0FBQSxFQUNFO0FBQUEsa0JBQUEsSUFBQSxFQUFNLHlCQUFOO0FBQUEsa0JBQ0EsUUFBQSxFQUFVO29CQUNSO0FBQUEsc0JBQUEsT0FBQSxFQUFTLHdCQUFUO3FCQURRO21CQURWO2lCQURGO2VBRkY7YUFEUSxFQVNSO0FBQUEsY0FBQSxPQUFBLEVBQVMsVUFBVDthQVRRLEVBV1I7QUFBQSxjQUFBLE9BQUEsRUFBUyxjQUFUO2FBWFEsRUFhUjtBQUFBLGNBQUEsT0FBQSxFQUFTLGVBQVQ7QUFBQSxjQUNBLEtBQUEsRUFBTyxlQURQO0FBQUEsY0FFQSxXQUFBLEVBQWEsRUFBQSxHQUFHLElBQUksQ0FBQyxJQUFSLEdBQWEsWUFBYixHQUF5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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/lib/code-block-generator.coffee
