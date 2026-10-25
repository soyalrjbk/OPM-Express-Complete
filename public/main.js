let trash = document.getElementsByClassName("retire");

//Retire
Array.from(trash).forEach(function(element) {
      element.addEventListener('click', function(){
      const id = this.parentNode.parentNode.dataset.id
        fetch('retire', {
          method: 'delete',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ id })
        }).then(function (response) {
          window.location.reload()
        })
      });
});
