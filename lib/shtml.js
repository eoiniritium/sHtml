var fs = require('fs'); // For io

// IO
function read(path){
    try {
        var data = fs.readFileSync(path, 'utf8');
        return data.toString();    
    } catch(e) {
        console.warn('Error:', e.stack);
    }
}



// HTML substitution
function sub_in(html, variablesjson) {
    let res = html;
    const length = Object.keys(variablesjson).length;

    for(let i = 0; i < length; i++) {
        let key = Object.keys(variablesjson)[i];
        let formatted = '~{' + key + '}~';
        while(res.includes(formatted)) {
            res = res.replace(formatted, variablesjson[key]);
        }
    }
    return res;
}



// CSS - WORKING
function css_regex(){
    return /<link rel="stylesheet" href=(["'])(?:(?=(\\?))\2.)*?\1>/gm; // How does this work? We will never question JS
}

function append_css(html, path)
{
    // Glue css to end of html with <style></style> either side
    return html + '\n<style>\n' + read(path) + '\n</style>';
}

function add_css(html) {
    let res = html;
    const reg = css_regex(); // regex string for link tag
    let positions = [];


    // Get positions of tags
    let match;
    while (match = reg.exec(res)) {
        positions.push([match.index, reg.lastIndex]);
    }

    const inst = positions.length;
    // Loop backwards to avoid issues with text moving positions
    for(let i = inst - 1; i >= 0; i--) {
        // Example of tag: <link rel="stylesheet" href="styles.css">

        // Find file name
        let start = positions[i][0] + 29;
        let end   = positions[i][1] -  2;

        // Append css to end of file
        res = append_css(res, res.substring(start, end));

        // Remove tags
        res = res.substring(0, positions[i][0]) + res.substring(positions[i][1]);
    }

    return res;
}



// JAVASCRIPT (ECMASCRIPT)
function js_regex() {
    return /<script src=(["'])(?:(?=(\\?))\2.)*?\1><\/script>/gm;
}

function append_js(html, path) {
    return html + '\n<script>\n' + read(path) + '\n</script>';
}

function add_js(html) {
    let res = html;
    const reg = js_regex();
    let positions = [];

    // Get positions of tags
    let match;
    while (match = reg.exec(res)) {
        positions.push([match.index, reg.lastIndex]);
    }

    const inst = positions.length;
    // Loop backwards to avoid issues with text moving positions
    for(let i = inst - 1; i >= 0; i--) {
        // Example of tag: <script src="myscripts.js"></script>

        // Find file name
        let start = positions[i][0] + 13;
        let end   = positions[i][1] - 11;

        // Append css to end of file
        res = append_js(res, res.substring(start, end));

        // Remove tags
        res = res.substring(0, positions[i][0]) + res.substring(positions[i][1]);
    }

    return res;
}



// Interface
module.exports = {
    render: function(path, variablesjson) {
        let res = add_js(add_css(sub_in(read(path), variablesjson)));
        return res;
    }
};