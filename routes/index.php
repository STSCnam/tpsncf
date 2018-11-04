<?php

use Enginr\Router;
use PDO\Connector;
$env = json_decode(file_get_contents(__DIR__ . '/../env.json'));

$router = new Router();

$router->get('/', function($req, $res) use ($env) {
    $cnx = new Connector($env->database);

    $result = $cnx->query('SELECT * FROM sncf.activite');

    $res->render('index', [
        'activities' => $result
    ]);
});

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