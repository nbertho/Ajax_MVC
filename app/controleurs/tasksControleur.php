<?php
/*
    ./app/controleurs/pagesControleur.php
    Contrôleur des pages
 */
    namespace App\Controleurs\Tasks;
    use App\Modeles\Task;

    function indexAction(\PDO $connexion, array $params = []){
      include_once '../app/modeles/tasksModele.php';
      $tasks = Task\findAll($connexion, $params);
      $nbreTasks = Task\findFinishedCount($connexion);

      GLOBAL $title, $content1;
      $title = TITRE_DEFAUT;
      ob_start();
        include '../app/vues/tasks/index.php';
      $content1 = ob_get_clean();
    }

    function addAction(\PDO $connexion, $taskAdd){
      include_once '../app/modeles/tasksModele.php';
      $add = Task\insert($connexion, $taskAdd);
      echo $add;
    }

    function editAction(\PDO $connexion, $data){
      include_once '../app/modeles/tasksModele.php';
      $edit = Task\updateOneById($connexion, $data);
      echo $edit;

    }

    function toggleFinishAction(\PDO $connexion, $data){
      include_once '../app/modeles/tasksModele.php';
      Task\updateFinishedOneById($connexion, $data);
      $answer = Task\findFinishedCount($connexion);
      echo $answer;

    }

    function deleteAction(\PDO $connexion, $idDelete){
      include_once '../app/modeles/tasksModele.php';
      $delete = Task\deleteOneById($connexion, $idDelete);
      echo $delete;
    }

    function deleteAllFinished(\PDO $connexion){
      include_once '../app/modeles/tasksModele.php';
      Task\deleteAllFinished($connexion);
    }
