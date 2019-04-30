class Party{
    constructor(name, details) {
            this.parties = {};
            this.parties[name] = {
                details: details,
            };
    }

    signUp(name, cb) {
        this.parties[name].people.push(cb)
    }
    notify() {
            for(const party in this.parties){

            }
    }
}
const birthDayParty = new party('birthDay', '8 pm')
birthDayParty.signUp('birthDay', (details) => {
        console.log(details)
})