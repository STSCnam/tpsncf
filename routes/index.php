<?php

use Enginr\Router;
use PDO\Connector;

$env = json_decode(file_get_contents(__DIR__ . '/../env.json'));

$router = new Router();

/**
 * Root route processing
 */
$router->get('/', function($req, $res) use ($env) {
    $cnx = new Connector($env->database);

    $result = $cnx->query('SELECT * FROM sncf.activite');

    $res->render('index', [
        'activities' => $result
    ]);
});

/**
 * Route processing /formations/:num
 * This route will retrieve the formations from the database and return the result
 * 
 * [param] :num An activity code
 * 
 * [send] json The formations in json format
 */
$router->get('/formations/:num', function($req, $res) use ($env) {
    $cnx = new Connector($env->database);

    $result = $cnx->query('SELECT * FROM sncf.formation WHERE numeroActivite = :num', [
        'num' => $req->params->num
    ]);

    $res->setHeaders([
        'Content-Type' => 'application/json'
    ]);

    $res->send(json_encode($result));
});

/**
 * Route processing /registered/:code
 * This route will retrieve the agents registered to the formation passed in the url parameter
 * 
 * [param] :code A formation code
 * 
 * [send] json The agents registered in json format
 */
$router->get('/registered/:code', function($req, $res) use ($env) {
    $cnx = new Connector($env->database);

    $sql  = 'SELECT t2.civilite, t2.prenom, t2.nom, t2.ville, t1.presence ';
    $sql .= 'FROM sncf.inscription AS t1 ';
    $sql .= 'INNER JOIN sncf.agent AS t2 ';
    $sql .= 'ON t1.codeAgent = t2.code ';
    $sql .= 'WHERE t1.numeroFormation = :code';

    $result = $cnx->query($sql, [
        'code' => $req->params->code
    ]);

    $res->send(json_encode($result));
});

return $router;