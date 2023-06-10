export const validateTelegramInitData = (initData: string) => {
    // формируем объект из строки initData
    const params = new URLSearchParams(initData);
    const hash = params.get('hash');

    // удалялем хеш, он не нужен для валидации
    params.delete('hash');

    // сортируем ключи в алфавитном порядке
    const keys = Array.from(params.keys());
    keys.sort();

    // формируем строку, которую отправим на сервер для валидации
    const dataCheckString = keys.map(key => `${key}=${params.get(key)}`).join('\n');
}