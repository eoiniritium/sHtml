function addtext() {
    let p_tag = document.createElement("P");
    let t = document.createTextNode("This is a paragraph.");
    p_tag.appendChild(t);
    document.getElementById("div").appendChild(p_tag);
}