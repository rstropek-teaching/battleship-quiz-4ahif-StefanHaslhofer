$(() => {
  // Select table containing the battleground
  const battleground = $('#battleground');
  let upper=10;
  let lower=0;

  // Build 10 x 10 grid for battleground
  for (let row = 0; row < upper; row++) {
    // Create table row
    const tr = $('<tr>');
    for (let column = 0; column < upper; column++) {
      // Create table cell with CSS class `water`. Note that we use
      // HTML data attributes  to store the coordinates of each cell
      // (see https://developer.mozilla.org/en-US/docs/Learn/HTML/Howto/Use_data_attributes). 
      // That makes it much easier to find cells based on coordinates later.
      $('<td>').addClass('water').attr('data-r', row).attr('data-c', column).appendTo(tr);
    }

    // Add table row to battleground table
    tr.appendTo(battleground);
  }

  $('#generate').click(() => {
    // Here you have to add your code for building a random battleground.
    var ships = [2, 3, 3, 4, 5];
    var count=0;
    for(let i=0;i<ships.length;){
      if(placeShip(ships[i])){
        i++;
      }
      count++;
      if(count>1000){
        throw new Error("No possible formation!");
      }
    }
  });
});

function placeShip(size){
  
  var direction=Math.floor(Math.random()*(2-1+1)+1);
  var x=Math.floor(Math.random()*((10-size)-0+1));
  var y=Math.floor(Math.random()*((10-size)-0+1));

  if(direction==1){
    for(let i=x-1;i<x+size+1;i++){
      if($('td[data-r="'+(y+1)+'"][data-c="'+i+'"]').hasClass('ship')||$('td[data-r="'+(y-1)+'"][data-c="'+i+'"]').hasClass('ship')||$('td[data-r="'+y+'"][data-c="'+i+'"]').hasClass('ship')){
        return false;
      }
    }
    for (let shipLength=0; shipLength<size; shipLength++) {
      $('td[data-r="'+y+'"][data-c="'+x+'"]').removeClass('water').addClass('ship');
      x++;
    }
  }else{
    for(let i=y-1;i<y+size+1;i++){
      if($('td[data-r="'+i+'"][data-c="'+(x+1)+'"]').hasClass('ship')||$('td[data-r="'+i+'"][data-c="'+(x-1)+'"]').hasClass('ship')||$('td[data-r="'+i+'"][data-c="'+x+'"]').hasClass('ship')){
        return false;
      }
    }
    for (let shipLength=0; shipLength<size; shipLength++) {
      $('td[data-r="'+y+'"][data-c="'+x+'"]').removeClass('water').addClass('ship');
      y++;
    }
  } 
  return true;
}