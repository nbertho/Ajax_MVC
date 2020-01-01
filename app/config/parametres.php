<?php
/*
    ./app/config/parametres.php
    Paramètres de l'application
 */

// Constantes de connexion
  define('DBHOTE', 'localhost:3306');
  define('DBNAME', 'todolist_ajax');
  define('DBUSER', 'root');
  define('DBPWD' , 'root');
  define('PUBLIC_PATH', 'public');
  define('ADMIN_PATH' , 'backoffice');

// Zones dynamiques du template
  $content1 = '';
  $title    = '';

// Textes
  define('TITRE_DEFAUT', "Liste des tâches");
