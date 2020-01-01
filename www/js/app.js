$(function functionName() {

  // AJOUT DE TACHES
  $('.new-todo').on('keyup', function(e) {
    // Si la touche 'enter' est pressée
    if (e.which === 13) {

      // Désactivation du formulaire
      $(this).attr("disabled", "disabled");
      // Récupération des données de l'input
      let inputVal = $(this).val();

      // Transaction ajax => Ajout d'une tache
        $.ajax({
          url: "tasks/add",
          data: {
            task: inputVal
          },
          method: 'post',
        })

        // Succes
        .done(function(reponsePHP){
          // Définition du code à renvoyer (variable : reponsePHP(id de la task) et inputVal(texte de la tache))
          let code = `<li class="todo <?php echo ($task['finished']==1)?'completed':''; ?>" data-id="${reponsePHP}">
                        <div class="view">
                          <input class="toggle" type="checkbox">
                          <label>${inputVal}</label>
                          <button class="destroy"></button>
                        </div>
                      </li>`;
          // Ecriture du code
          $('.todo-list').prepend(code).find('li:first').hide().slideDown();
          // Vidage du formulaire
          $('.new-todo').val('');
        })

        // Echec
        .fail(function(){
          alert('Erreur transaction ajax ajout de taches');
        });

      // Réactivation du formulaire
      $('.new-todo').removeAttr('disabled');
    };
  });

  // SUPPRESSION DE TACHES
    $('.todo-list').on('click', '.destroy', function(event) {
      // Récupération de l'id du post
      let idPostToDelete = $(this).closest('li').attr('data-id');
      let that = $(this);
      // Transaction ajax => Suprression d'une tache
        $.ajax({
          url: "tasks/delete",
          data: {
            id: idPostToDelete
          },
          method: 'post',
        })

        // Succes
        .done(function(reponsePHP){
          if (reponsePHP == 1) {
            that.closest('li').slideUp(400, function() {
              $(this).remove();
            })
          }
        })

        // Echec
        .fail(function(){
          alert('Erreur transaction ajax suppression de taches');
        });
    });

//FIN
});
