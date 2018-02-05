const format = require('./format')
const toHTML = require('snabbdom-to-html')
const { div } = require('./tags')

const singleLineExample = 'This is some really great text.'
const paragraphExample = `
This is some really great text.

And some more even really great text.

Finally, the last of it.
`
const paragraphHtml =
  '<div><p>This is some really great text.</p><p>And some more even really great text.</p><p>Finally, the last of it.</p></div>'
const headingExample = `
# I love _headings_

Hooray!

Great text.
`
const headingHtml =
  '<div><h1>I love <em>headings</em></h1><p>Hooray!</p><p>Great text.</p></div>'
const inlineExample = 'I _love_ **examples**.'
const inlineHtml = '<div>I <em>love</em> <strong>examples</strong>.</div>'
const imageExample = 'I love ![An Image](https://example.com/.img) images.'
const imageHtml =
  '<div>I love <img src="https://example.com/.img" title="An Image"> images.</div>'

describe('format', () => {
  it('should not paragraph a single line of text', () => {
    const result = format(singleLineExample)
    expect(result).toEqual(singleLineExample)
  })

  it('should format paragraphs', () => {
    const html = toHTML(div(format(paragraphExample)))
    expect(html).toEqual(paragraphHtml)
  })

  it('should format a heading', () => {
    const html = toHTML(div(format(headingExample)))
    expect(html).toEqual(headingHtml)
  })

  it('should format inliners', () => {
    const html = toHTML(div(format(inlineExample)))
    expect(html).toEqual(inlineHtml)
  })

  it('should format inline images', () => {
    const html = toHTML(div(format(imageExample)))
    expect(html).toEqual(imageHtml)
  })
})
