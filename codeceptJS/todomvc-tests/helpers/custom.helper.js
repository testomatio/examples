let Helper = codecept_helper;

const toString = sel => {
    if (typeof(sel) === 'string') return sel
    if (typeof(sel) === 'object') {
        return sel.css || sel.xpath
    }
}

class CustomHelper extends Helper {
    const client = this.helpers['Puppeteer'];

    async hover(selector) {
        await client.page.hover(toString(selector))
    }

    async typeText(text) {
        await client.page.keyboard.type(text)
    }

}

module.exports = CustomHelper;
