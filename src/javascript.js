function addtext() {
    let p_tag = document.createElement("P");
    let t = document.createTextNode("Text added to div!");
    p_tag.appendChild(t);
    document.getElementById("div").appendChild(p_tag);
}