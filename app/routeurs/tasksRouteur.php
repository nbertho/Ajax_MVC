<?php
/*
    ./app/routeurs/tasksRouteur.php
    Routeur des Tasks
 */

include_once '../app/controleurs/tasksControleur.php';
use \App\Controleurs\Tasks;

  switch ($_GET['tasks']):

    case 'add':
      include_once '../app/controleurs/tasksControleur.php';
      \App\Controleurs\Tasks\addAction($connexion, $_POST['task']);
      break;
    case 'delete':
      include_once '../app/controleurs/tasksControleur.php';
      \App\Controleurs\Tasks\deleteAction($connexion, $_POST['id']);
      break;
    case 'toggleFinish':
      include_once '../app/controleurs/tasksControleur.php';
      \App\Controleurs\Tasks\toggleFinishAction($connexion, ['id' => $_POST['id'], 'finished'  => $_POST['status'] ]);
      break;
    case 'edit':
      include_once '../app/controleurs/tasksControleur.php';
      \App\Controleurs\Tasks\editAction($connexion, ['id' => $_POST['id'], 'content'  => $_POST['text'] ]);
      break;
    case 'deleteFinished':
      include_once '../app/controleurs/tasksControleur.php';
      \App\Controleurs\Tasks\deleteAllFinished($connexion);
      break;
  endswitch;
