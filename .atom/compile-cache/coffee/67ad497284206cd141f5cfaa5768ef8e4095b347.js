(function() {
  var generator;

  generator = require('../lib/code-block-generator');

  describe('Code block generator', function() {
    describe('with AsciiDoc syntax', function() {
      it('should generate default code block', function() {
        var codeBlocks, languages;
        languages = [];
        codeBlocks = generator.makeAsciidocBlocks(languages);
        expect(codeBlocks).toHaveLength(2);
        return expect(codeBlocks[0]).toEqualJson({
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
      });
      it('should generate listing block', function() {
        var codeBlocks, languages;
        languages = [];
        codeBlocks = generator.makeAsciidocBlocks(languages);
        expect(codeBlocks).toHaveLength(2);
        return expect(codeBlocks[1]).toEqualJson({
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
      });
      it('should generate Javascript code block', function() {
        var codeBlocks, languages;
        languages = [
          {
            pattern: 'javascript|js',
            type: 'source',
            code: 'js'
          }
        ];
        codeBlocks = generator.makeAsciidocBlocks(languages);
        expect(codeBlocks).toHaveLength(3);
        return expect(codeBlocks[0]).toEqualJson({
          name: "markup.code.js.asciidoc",
          begin: "(?=(?>(?:^\\[(source)(?:,|#)\\p{Blank}*(?i:(javascript|js))((?:,|#)[^\\]]+)*\\]$)))",
          patterns: [
            {
              match: "^\\[(source)(?:,|#)\\p{Blank}*(?i:(javascript|js))((?:,|#)([^,\\]]+))*\\]$",
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
              contentName: "source.embedded.js",
              patterns: [
                {
                  include: '#block-callout'
                }, {
                  include: '#include-directive'
                }, {
                  include: "source.js"
                }
              ],
              end: '^(\\1)$'
            }, {
              comment: 'open block',
              begin: '^(-{2})\\s*$',
              contentName: "source.embedded.js",
              patterns: [
                {
                  include: '#block-callout'
                }, {
                  include: '#include-directive'
                }, {
                  include: "source.js"
                }
              ],
              end: '^(\\1)$'
            }, {
              comment: 'literal block',
              begin: '^(\\.{4})\\s*$',
              contentName: "source.embedded.js",
              patterns: [
                {
                  include: '#block-callout'
                }, {
                  include: '#include-directive'
                }, {
                  include: "source.js"
                }
              ],
              end: '^(\\1)$'
            }
          ],
          end: '((?<=--|\\.\\.\\.\\.)[\\r\\n]+$|^\\p{Blank}*$)'
        });
      });
      return it('should generate C++ code block', function() {
        var codeBlocks, languages;
        languages = [
          {
            pattern: 'c(pp|\\+\\+)',
            type: 'source',
            code: 'cpp'
          }
        ];
        codeBlocks = generator.makeAsciidocBlocks(languages);
        expect(codeBlocks).toHaveLength(3);
        return expect(codeBlocks[0]).toEqualJson({
          name: "markup.code.cpp.asciidoc",
          begin: "(?=(?>(?:^\\[(source)(?:,|#)\\p{Blank}*(?i:(c(pp|\\+\\+)))((?:,|#)[^\\]]+)*\\]$)))",
          patterns: [
            {
              match: "^\\[(source)(?:,|#)\\p{Blank}*(?i:(c(pp|\\+\\+)))((?:,|#)([^,\\]]+))*\\]$",
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
              contentName: "source.embedded.cpp",
              patterns: [
                {
                  include: '#block-callout'
                }, {
                  include: '#include-directive'
                }, {
                  include: "source.cpp"
                }
              ],
              end: '^(\\1)$'
            }, {
              comment: 'open block',
              begin: '^(-{2})\\s*$',
              contentName: "source.embedded.cpp",
              patterns: [
                {
                  include: '#block-callout'
                }, {
                  include: '#include-directive'
                }, {
                  include: "source.cpp"
                }
              ],
              end: '^(\\1)$'
            }, {
              comment: 'literal block',
              begin: '^(\\.{4})\\s*$',
              contentName: "source.embedded.cpp",
              patterns: [
                {
                  include: '#block-callout'
                }, {
                  include: '#include-directive'
                }, {
                  include: "source.cpp"
                }
              ],
              end: '^(\\1)$'
            }
          ],
          end: '((?<=--|\\.\\.\\.\\.)[\\r\\n]+$|^\\p{Blank}*$)'
        });
      });
    });
    return describe('with Markdown syntax', function() {
      it('should generate default code block', function() {
        var codeBlocks, languages;
        languages = [];
        codeBlocks = generator.makeMarkdownBlocks(languages);
        expect(codeBlocks).toHaveLength(1);
        return expect(codeBlocks[0]).toEqualJson({
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
      });
      it('should generate Javascript code block', function() {
        var codeBlocks, languages;
        languages = [
          {
            pattern: 'javascript|js',
            type: 'source',
            code: 'js'
          }
        ];
        codeBlocks = generator.makeMarkdownBlocks(languages);
        expect(codeBlocks).toHaveLength(2);
        return expect(codeBlocks[0]).toEqualJson({
          name: 'markup.code.js.asciidoc',
          begin: '^\\s*(`{3,})\\s*(?i:(javascript|js))\\s*$',
          beginCaptures: {
            0: {
              name: 'support.asciidoc'
            }
          },
          end: '^\\s*\\1\\s*$',
          endCaptures: {
            0: {
              name: 'support.asciidoc'
            }
          },
          contentName: 'source.embedded.js',
          patterns: [
            {
              include: '#block-callout'
            }, {
              include: 'source.js'
            }
          ]
        });
      });
      return it('should generate C++ code block', function() {
        var codeBlocks, languages;
        languages = [
          {
            pattern: 'c(pp|\\+\\+)',
            type: 'source',
            code: 'cpp'
          }
        ];
        codeBlocks = generator.makeMarkdownBlocks(languages);
        expect(codeBlocks).toHaveLength(2);
        return expect(codeBlocks[0]).toEqualJson({
          name: 'markup.code.cpp.asciidoc',
          begin: '^\\s*(`{3,})\\s*(?i:(c(pp|\\+\\+)))\\s*$',
          beginCaptures: {
            0: {
              name: 'support.asciidoc'
            }
          },
          end: '^\\s*\\1\\s*$',
          endCaptures: {
            0: {
              name: 'support.asciidoc'
            }
          },
          contentName: 'source.embedded.cpp',
          patterns: [
            {
              include: '#block-callout'
            }, {
              include: 'source.cpp'
            }
          ]
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvbmljay8uYXRvbS9wYWNrYWdlcy9sYW5ndWFnZS1hc2NpaWRvYy9zcGVjL2NvZGUtYmxvY2stZ2VuZXJhdG9yLXNwZWMuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLFNBQUE7O0FBQUEsRUFBQSxTQUFBLEdBQVksT0FBQSxDQUFRLDZCQUFSLENBQVosQ0FBQTs7QUFBQSxFQUVBLFFBQUEsQ0FBUyxzQkFBVCxFQUFpQyxTQUFBLEdBQUE7QUFFL0IsSUFBQSxRQUFBLENBQVMsc0JBQVQsRUFBaUMsU0FBQSxHQUFBO0FBRS9CLE1BQUEsRUFBQSxDQUFHLG9DQUFILEVBQXlDLFNBQUEsR0FBQTtBQUN2QyxZQUFBLHFCQUFBO0FBQUEsUUFBQSxTQUFBLEdBQVksRUFBWixDQUFBO0FBQUEsUUFDQSxVQUFBLEdBQWEsU0FBUyxDQUFDLGtCQUFWLENBQTZCLFNBQTdCLENBRGIsQ0FBQTtBQUFBLFFBRUEsTUFBQSxDQUFPLFVBQVAsQ0FBa0IsQ0FBQyxZQUFuQixDQUFnQyxDQUFoQyxDQUZBLENBQUE7ZUFHQSxNQUFBLENBQU8sVUFBVyxDQUFBLENBQUEsQ0FBbEIsQ0FBcUIsQ0FBQyxXQUF0QixDQUNFO0FBQUEsVUFBQSxLQUFBLEVBQU8sK0NBQVA7QUFBQSxVQUNBLFFBQUEsRUFBVTtZQUNSO0FBQUEsY0FBQSxLQUFBLEVBQU8sc0NBQVA7QUFBQSxjQUNBLFFBQUEsRUFDRTtBQUFBLGdCQUFBLENBQUEsRUFDRTtBQUFBLGtCQUFBLElBQUEsRUFBTSx5QkFBTjtBQUFBLGtCQUNBLFFBQUEsRUFBVTtvQkFDUjtBQUFBLHNCQUFBLE9BQUEsRUFBUyx3QkFBVDtxQkFEUTttQkFEVjtpQkFERjtlQUZGO2FBRFEsRUFTUjtBQUFBLGNBQUEsT0FBQSxFQUFTLFVBQVQ7YUFUUSxFQVdSO0FBQUEsY0FBQSxPQUFBLEVBQVMs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

//# sourceURL=/home/nick/.atom/packages/language-asciidoc/spec/code-block-generator-spec.coffee
