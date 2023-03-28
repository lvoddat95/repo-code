<!DOCTYPE html>
<html>
<head>
	<title>WebSocket Demo</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.2.0/socket.io.js"></script>
	<script>
		// Khởi tạo kết nối với server
		var socket = io('http://localhost:8080/repo-code/demo/');

		// Lắng nghe sự kiện nhận dữ liệu từ server
		socket.on('message', function(data) {
			// Hiển thị dữ liệu nhận được
			document.getElementById('output').innerHTML += '<p>' + data + '</p>';
		});

		// Gửi dữ liệu khi nhấn nút Gửi
		document.getElementById('send').addEventListener('click', function() {
			var message = document.getElementById('input').value;
			socket.emit('message', message);
			document.getElementById('input').value = '';
		});
	</script>
</head>
<body>
	<h1>WebSocket Demo</h1>
	<label for="input">Nhập dữ liệu:</label>
	<input type="text" id="input">
	<button id="send">Gửi</button>
	<div id="output"></div>
</body>
</html>
