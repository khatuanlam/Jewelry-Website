function toggle() {
    const content1 = document.getElementById('content1');
    const content2 = document.getElementById('content2');

    if (content1.style.display === 'none' || content1.style.display === '') {
        content1.style.display = 'flex'; 
        content2.style.display = 'none'; 
    } else {
        content1.style.display = 'none';
        content2.style.display = 'flex'; 
    }
}
document.getElementById('content1').style.display = 'flex';
document.getElementById('content2').style.display = 'none';
setInterval(toggle, 5000);



function searchUser(){
    let valuesearchInput= document.getElementById("search-text").value
    let userSearch= users.filter()
}