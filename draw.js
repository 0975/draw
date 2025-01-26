const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
const saveBtn = document.getElementById('saveBtn');
const clearBtn = document.getElementById('clearBtn');
const lineWidthInput = document.getElementById('lineWidth');

canvas.width = 800; // 设置画布宽度
canvas.height = 600; // 设置画布高度

let painting = false;

// 获取鼠标相对于画布的坐标
function getMousePosition(e) {
    const rect = canvas.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

function startPosition(e) {
    painting = true;
    draw(e);
}

function endPosition() {
    painting = false;
    ctx.beginPath(); // 开始新的路径
}

function draw(e) {
    if (!painting) return;

    const { x, y } = getMousePosition(e); // 获取鼠标位置

    ctx.lineWidth = lineWidthInput.value; // 使用输入框中的值设置线宽
    ctx.lineCap = 'round'; // 线条圆角
    ctx.strokeStyle = 'black'; // 线条颜色

    ctx.lineTo(x, y); // 使用鼠标位置绘制线条
    ctx.stroke();
    ctx.beginPath(); // 开始新的路径
    ctx.moveTo(x, y); // 移动到当前鼠标位置
}

// 添加事件监听器
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

// 保存图画
saveBtn.addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png'); // 将画布转换为图像
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'myDrawing.png'; // 保存的文件名
    link.click(); // 自动点击链接以下载
});

// 清空画布
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // 清空画布
});