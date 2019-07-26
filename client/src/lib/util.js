
function setHighlight(sel) {
    // sel.anchorNode.parentNode.classList.add('blue')
    // sel.focusNode.parentNode.classList.add('blue')
    let anchorId = parseInt(sel.anchorNode.parentNode.id);
    let focusId = parseInt(sel.focusNode.parentNode.id);

    if (focusId < anchorId) {
      let tempId = focusId;
      focusId = anchorId;
      anchorId = tempId;
    }

    const range = focusId - anchorId;

    for (let i = 0; i <= range; i++) {
      document.getElementById(anchorId + i).classList.add("blue");
    }
}