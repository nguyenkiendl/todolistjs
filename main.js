const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const app = (() => {
    const btn_control = $('.btn-control');
    const root = $('#root');

    const todos = [];

    const time = {
        hours: [],
        minutes: []
    };

    const todoText = $('#todo__text');
    const hours = $('#todo__hours');
    const minutes = $('#todo__minutes');
    const todoTotal = $('.todo__total');

    return {
        getTime() {
            for (let i = 0; i <= 24; i++) {
                if (i < 10) i = '0' + i;
                time.hours.push(i.toString());
            }
            for (let i = 0; i <= 60; i++) {
                if (i < 10) i = '0' + i;
                time.minutes.push(i.toString());
            }
            return time;
        },
        renderTime() {
            const time = this.getTime();
            const optionHours = time.hours.map((h, index) => `
                <option value="${h}">${h}</option>
            `).join('');
            const optionMinutes = time.minutes.map((m, index) => `
                <option value="${m}">${m}</option>
            `).join('');

            hours.innerHTML = optionHours;
            minutes.innerHTML = optionMinutes;
        },
        add(todo) {
            todos.push(todo);
        },
        delete(index) {
            todos.splice(index, 1);
        },
        done(index) {
            if (todos[index].done == true)
                todos[index].done = false;
            else
                todos[index].done = true;
        },
        render() {
            let html = '';
            todoTotal.innerHTML = todos.length;
            if (todos.length == 0) {
                html = '<div class="todo__none"><p>Nothing todo, Please enter something!</p></div>';
            } else {
                html = todos.sort(function (a, b) {
                    if (parseInt(a.hours) !== parseInt(b.hours)) {
                        return parseInt(a.hours) - parseInt(b.hours);
                    } else {
                        if (parseInt(a.minutes) === parseInt(b.minutes))
                            return -1;
                        else
                            return parseInt(a.minutes) - parseInt(b.minutes);
                    }
                }).map((todo, index) => `
                    <li class="todo__item ${todo.done ? 'done' : ''}">
                        <input id="item__${index}" class="btn-done" type="checkbox" data-index=${index} ${todo.done ? 'checked' : ''}>
                        <label for="item__${index}">${todo.name} <strong class="todo__time">${todo.hours} : ${todo.minutes}</strong></label>
                        <span class="btn-delete" data-index=${index}>+</span>
                    </li>
                `).join('');
            }
            root.innerHTML = html;
        },
        init() {
            const _this = this;
            console.log('init');

            document.addEventListener('click', function (event) {

                const btn_control = event.target.closest('.btn-control');
                if (btn_control) {
                    event.preventDefault();
                    btn_control.classList.toggle('show');
                    $('.todo__action').classList.toggle('show');
                }

                const btn_add = event.target.closest('.btn-add');
                if (btn_add) {
                    event.preventDefault();
                    if (todoText.value.trim() == '') {
                        alert('Enter todo');
                        return;
                    }
                    const itemTodo = {
                        name: todoText.value,
                        hours: hours.value,
                        minutes: minutes.value
                    }
                    _this.add(itemTodo);
                    todoText.value = '';
                    hours.value = '00';
                    minutes.value = '00';
                    _this.render();
                }

                if (event.target.classList.contains('btn-delete')) {
                    event.preventDefault();
                    let btn_delete = event.target;
                    let index = btn_delete.dataset.index;
                    _this.delete(index);
                    _this.render();
                }

                if (event.target.classList.contains('btn-done')) {
                    event.preventDefault();
                    let btn_done = event.target;
                    let index = btn_done.dataset.index;
                    _this.done(index);
                    _this.render();
                }
            })
            this.renderTime();
            this.render();
        }
    }
})();

app.init();