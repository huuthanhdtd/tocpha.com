<?php

return [
    'default'     => 'mysql',
    'prefix'      => 'pi_',
    'connections' => [
        'mysql' => [
            'driver'   => 'mysql',
            'hostname' => 'localhost',
            'port'     => '3306',
            'username' => 'root',
            'password' => 'root',
            'database' => 'phalconcms',
            'charset'  => 'utf8mb4'
        ]
    ]
];
