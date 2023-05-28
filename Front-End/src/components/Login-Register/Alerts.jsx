export const loggedInAlert = () => {
    return (
        <div className="alertGreen">
            <strong>Logged In</strong>
        </div>
    );
};

export const wrongUserAlert = () => {
    return (
        <div className="alert">
            <strong>Wrong email or password</strong>
        </div>
    );
};

export const registeredAlert = () => {
    return (
        <div className="alertGreen">
            <strong>You have been registered!</strong>
        </div>
    );
};

export const usernameTakenAlert = () => {
    return (
        <div className="alert">
            <strong>Email is already in use!</strong>
        </div>
    );
};

export const passwordTooWeekAlert = () => {
    return (
        <div className="alert">
            <strong>Password too weak!</strong>
        </div>
    );
};
export const invalidEmailAlert = () => {
    return (
        <div className="alert">
            <strong>Invalide Email!</strong>
        </div>
    );
};
