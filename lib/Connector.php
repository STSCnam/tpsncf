<?php

namespace PDO;

class Connector {
    private $_db;

    public function __construct($params) {
        if (gettype($params) === 'array')
            $params = (object)$params;
        else if (gettype($params) !== 'object')
            throw new \Exception(
                '1st argument must be a type of array or object.' .
                gettype($params) . ' given.'
            );

        if (!property_exists($params, 'db'))
            $params->{'db'} = '';

        if (!property_exists($params, 'port'))
            $params->{'port'} = 3306;

        try {
            $this->_db = new \PDO(
                "mysql:host=$params->host;dbname=$params->db;port=$params->port",
                $params->user,
                $params->passwd
            );
        } catch (\Exception $e) {
            die($e);
        }
    }

    public function query($sql, $params = []) {
        $stmt = $this->_db->prepare($sql);

        foreach ($params as $key => $val) {
            $stmt->bindParam($key, $val);
        }

        $stmt->execute();

        return $stmt->fetchAll(\PDO::FETCH_OBJ);
    }
}