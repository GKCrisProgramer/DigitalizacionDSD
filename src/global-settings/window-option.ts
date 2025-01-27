const screenAvail = {
    Width: window.screen.availWidth,
    Height: window.screen.availHeight,
}

export const windowOption = {
    options: `toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=${screenAvail.Width},height=${screenAvail.Height}`
}
