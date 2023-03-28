<?php 
require __DIR__ . '/vendor/autoload.php';

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\WebSocket\MessageComponentInterface;
use Ratchet\WebSocket\WsServer;

require __DIR__ . '/vendor/autoload.php';

// Khai báo class để xử lý các kết nối và tin nhắn
class MyWebSocket implements MessageComponentInterface {
    private $connections;

    public function __construct() {
        $this->connections = new \SplObjectStorage();
    }

    // Khi có kết nối mới được thiết lập
    public function onOpen(ConnectionInterface $connection) {
        $this->connections->attach($connection);
        echo "New connection: {$connection->resourceId}\n";
    }

    // Khi nhận được tin nhắn từ client
    public function onMessage(ConnectionInterface $from, $msg) {
        // xử lý nội dung tin nhắn và trả lại kết quả
        $result = $this->processMessage($msg);

        // gửi kết quả trả về đến client gửi tin nhắn
        $from->send($result);

        // gửi kết quả trả về đến tất cả các client khác
        foreach ($this->connections as $connection) {
            if ($connection !== $from) {
                $connection->send($result);
            }
        }
    }

    // Khi một kết nối bị đóng
    public function onClose(ConnectionInterface $connection) {
        $this->connections->detach($connection);
        echo "Connection closed: {$connection->resourceId}\n";
    }

    // Khi có lỗi xảy ra
    public function onError(ConnectionInterface $connection, \Exception $e) {
        echo "Error: {$e->getMessage()}\n";
        $connection->close();
    }

    // Xử lý tin nhắn từ client và trả về kết quả
    private function processMessage($msg) {
        // xử lý tin nhắn và trả về kết quả
        return "Processed message: {$msg}";
    }
}

// Khởi tạo WebSocket server
$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new MyWebSocket()
        )
    ),
    8080
);

// Khởi chạy server
$server->run();

?>