wtd = 0;

function menu()
{
    if(wtd===0) {
        document.getElementById("nav").style.display = 'flex';
        document.getElementById("hamb").innerHTML = '<i class="fa fa-times"></i>';
        wtd=1;
    } else {
        document.getElementById("nav").style.display = 'none';
        document.getElementById("hamb").innerHTML = '<i class="fa fa-bars"></i>';
        wtd=0;
    }
}
