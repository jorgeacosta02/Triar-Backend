import app from "./app";
import './db';

app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});