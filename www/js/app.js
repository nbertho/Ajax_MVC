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

  // EDITION DE TACHES
    $('.todo-list').on('dblclick', 'label', function() {
      let idPostToEdit = $(this).closest('li').attr('data-id');
      let dataPostToEdit = $(this).text();
      let countEditProgress = $('.todo-list').find('.editInProgress').length;
      let that = $(this);
      // Ajout de la classe editInProgress à la tache en cours d'edition
      $(this).closest('li').addClass('editInProgress');
      // Vérification qu'il n'y a qu'une tache en cours de modification
      // Sinon, retrait de la classe editInProgress et alert d'un message d'erreur
      if (countEditProgress !== 0) {
        $(this).closest('li').removeClass('editInProgress');
        alert("Attention, une autre tache est en cours d'édition");
      }
      else {
        // Transformtaion en input
        $(this).closest('label').html(`<input class="inputEdit" type="texte" value="${dataPostToEdit}">`);
        $('.editInProgress').on("keyup", function(e) {
          if (e.which === 13) {
            let editId = that.closest('li').attr('data-id');
            let editInput = $(this).find('.inputEdit').val();
            //On désactive le formulaire
            $(this).attr("disabled", "disabled");
            // Transaction ajax => Edition d'une tache
              $.ajax({
                url: "tasks/edit",
                data: {
                  id: editId,
                  text: editInput
                },
                method: 'post',
              })

              // Succes
              .done(function(reponsePHP){
                that.closest('label').text(editInput);
                that.closest('li').removeClass('editInProgress');
              })

              // Echec
              .fail(function(){
                alert('Erreur transaction ajax edition de taches');
              });
          }
        })
      }
    });

  // Changement de statut DES TACHES EFFECTUEES - EN COURS
    $('.todo-list').on('click', '.toggle', function() {
      let that = $(this);
      let idFinished = $(this).closest('li').attr('data-id');
      let statutOriginal = $(this).attr("checked");
      // Définition du statutUpdate en fonction de son statut initial
      if (statutOriginal === 'checked') {
        statutUpdate = 0;
      }
      else {
        statutUpdate = 1;
      }
      // Transaction Ajax => Statut des taches
        $.ajax({
          url: "tasks/toggleFinish",
          data: {
            id: idFinished,
            status: statutUpdate
          },
          method: 'post',
        })

        // Succes
        .done(function(reponsePHP){
          that.closest('li').toggleClass('completed');
          if (statutUpdate === 1) {
            that.attr('checked', 'checked');
          }
          else {
            that.removeAttr('checked');
          }
        })

        // Echec
        .fail(function(){
          alert("Erreur transaction ajax changement de statut d'une tache");
        });





    });

  // SUPPRESSION DE TOUTES LES TACHES COMPLETEES
    $('.footer').on('click', '.clear-completed', function(e) {
      // Demander une validation
      let confirmDeleteAllDone = confirm('Etes vous sur de vouloir supprimer toutes les taches déjà effectuées?');
      if (confirmDeleteAllDone === true) {
        // Transaction Ajax => Supprimer toutes les taches accomplies
          $.ajax({
            url: "tasks/deleteFinished",
            method: 'post',
          })

          // Succes
          .done(function(reponsePHP){
            $('.todo-list').children('.completed').slideUp(400, function() {
              $(this).remove();
            })
          })

          // Echec
          .fail(function(){
            alert('Erreur transaction ajax suppression des taches effectuées');
          });
      }
    })








//FIN
});
