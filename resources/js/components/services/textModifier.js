const textModifier = (text) => {
    let filteredText =  text.replace(/-/g, " ").replace(/_/g, ' '); 
    var modifiedText = filteredText
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

    return <span title={modifiedText}>{modifiedText}</span>
}

export default textModifier;