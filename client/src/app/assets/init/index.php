<?php

header('Content-Type:text/css');
$out = [];
system('/usr/local/bin/sass ' . $_SERVER['DOCUMENT_ROOT'] . $_SERVER['REQUEST_URI'] . ' --trace');
