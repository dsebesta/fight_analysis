module.exports.statCalc = (results) => {
    return new Promise((resolve, reject) => {

        let fighters = JSON.parse(JSON.stringify(results));
        let fighter_0 = fighters.event_fighters[0].fighter;
        let fighter_1 = fighters.event_fighters[1].fighter;
        let first_year_0 = [], first_year_1 = [];
        fighter_0.ufc_fights = 0;
        fighter_1.ufc_fights = 0;
        fighter_0.mma_rounds = 0;
        fighter_1.mma_rounds = 0;
        fighter_0.ko_loss = 0;
        fighter_1.ko_loss = 0;
        fighter_0.sub_loss = 0;
        fighter_1.sub_loss = 0;

        //Days Since Last Fight
        const one_day = 24*60*60*1000;
        const one_year = one_day * 365;
        const event_date = fighters.event_date.split('-');
        const last_fight_0 = fighter_0.records[0].date.split('-');
        const last_fight_1 = fighter_1.records[0].date.split('-');
        const event_date_format = new Date(event_date[0],event_date[1],event_date[2]);
        const last_fight_format_0 = new Date(last_fight_0[0], last_fight_0[1], last_fight_0[2]);
        const last_fight_format_1 = new Date(last_fight_1[0], last_fight_1[1], last_fight_1[2]);
        const diff_days_0 = Math.round(Math.abs((event_date_format.getTime() - last_fight_format_0.getTime())/(one_day)));
        const diff_days_1 = Math.round(Math.abs((event_date_format.getTime() - last_fight_format_1.getTime())/(one_day)));
        fighter_0.days_last_fight = diff_days_0;
        fighter_1.days_last_fight = diff_days_1;

        //Days Since Last Win, Last Loss, # Of UFC Wins, Total MMA Rounds, KO Loss, Submission Loss
        for (let i = 0, dlw_flag = false, dll_flag = false; i < fighter_0.records.length; i++) {
            if (fighter_0.records[i].result === 'win' && dlw_flag === false) {
                const last_win_0 = fighter_0.records[i].date.split('-');
                const last_win_format_0 = new Date(last_win_0[0], last_win_0[1], last_win_0[2]);
                fighter_0.days_last_win = Math.round(Math.abs((event_date_format.getTime() - last_win_format_0.getTime())/(one_day)));
                dlw_flag = true;
            }
            if (fighter_0.records[i].result === 'loss' && dll_flag === false) {
                const last_loss_0 = fighter_0.records[i].date.split('-');
                const last_loss_format_0 = new Date(last_loss_0[0], last_loss_0[1], last_loss_0[2]);
                fighter_0.days_last_loss = Math.round(Math.abs((event_date_format.getTime() - last_loss_format_0.getTime())/(one_day)));
                dll_flag = true;
            }
            if (fighter_0.records[i].name.includes('UFC')) {
                fighter_0.ufc_fights++
            }
            if (fighter_0.records[i].result === 'loss' && fighter_0.records[i].method.includes('KO')) {
                fighter_0.ko_loss++
            }
            else if (fighter_0.records[i].result === 'loss' && fighter_0.records[i].method.includes('Sub')) {
                fighter_0.sub_loss++
            }

            fighter_0.mma_rounds = fighter_0.mma_rounds + parseInt(fighter_0.records[i].round);
            first_year_0 = fighter_0.records[i].date.split('-');
        }
        for (let i = 0, dlw_flag = false, dll_flag = false; i < fighter_1.records.length; i++) {
            if (fighter_1.records[i].result === 'win' && dlw_flag === false) {
                const last_win_1 = fighter_1.records[i].date.split('-');
                const last_win_format_1 = new Date(last_win_1[0], last_win_1[1], last_win_1[2]);
                fighter_1.days_last_win = Math.round(Math.abs((event_date_format.getTime() - last_win_format_1.getTime())/(one_day)));
                dlw_flag = true;
            }
            if (fighter_1.records[i].result === 'loss' && dll_flag === false) {
                const last_loss_1 = fighter_1.records[i].date.split('-');
                const last_loss_format_1 = new Date(last_loss_1[0], last_loss_1[1], last_loss_1[2]);
                fighter_1.days_last_loss = Math.round(Math.abs((event_date_format.getTime() - last_loss_format_1.getTime())/(one_day)));
                dll_flag = true;
            }
            if (fighter_1.records[i].name.includes('UFC')) {
                fighter_1.ufc_fights++
            }
            if (fighter_1.records[i].result === 'loss' && fighter_1.records[i].method.includes('KO')) {
                fighter_1.ko_loss++
            }
            fighter_1.mma_rounds = fighter_1.mma_rounds + parseInt(fighter_1.records[i].round);
            first_year_1 = fighter_1.records[i].date.split('-');
        }

        //MMA Career Length

        const first_year_format_0 = new Date(first_year_0[0], first_year_0[1], first_year_0[2]);
        const first_year_format_1 = new Date(first_year_1[0], first_year_1[1], first_year_1[2]);
        fighter_0.mma_career = Math.round(Math.abs((event_date_format.getTime() - first_year_format_0.getTime())/(one_year)));
        fighter_1.mma_career = Math.round(Math.abs((event_date_format.getTime() - first_year_format_1.getTime())/(one_year)));



        //Coming Off A Loss
        let off_loss_0 = fighter_0.records[0].result;
        let off_loss_1 = fighter_1.records[0].result;
        off_loss_0 === 'loss' ? fighter_0.off_loss = 'yes' : fighter_0.off_loss = 'no';
        off_loss_1 === 'loss' ? fighter_1.off_loss = 'yes' : fighter_1.off_loss = 'no';


        resolve(fighters);
    })

};