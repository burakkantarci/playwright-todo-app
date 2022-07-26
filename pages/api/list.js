export default async (req, res) => {
    const token = "AZOsASQgNjEzNzdiMDktMTBkNC00N2M1LTk2OWQtZDg5MzNjN2NlYzIzM2I0MWUyMmY1YWM5NGZiMzhkYzBiMDg1YzVmZTczZGM=";
    const url = "https://us1-happy-bass-37804.upstash.io/lrange/todo/0/100?_token=" + token;

    return fetch(url)
        .then(r => r.json())
        .then(data => {
            let result = JSON.stringify(data.result)
            return res.status(200).json(result)
        })
}
