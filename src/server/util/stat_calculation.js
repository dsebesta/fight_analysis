module.exports.statCalc = (fighter_info) => {
    return new Promise((resolve, reject) => {
        let f_info = JSON.parse(JSON.stringify(fighter_info));
        let first_year = [];
        f_info.ufc_fights = 0;
        f_info.mma_rounds = 0;
        f_info.days_last_fight = 0;
        f_info.days_last_win = 0;
        f_info.days_last_loss = 0;
        f_info.years_mma_career = 0;
        f_info.off_loss = 'n/a';
        f_info.year_avg_rounds = 0.0;


        function round(value, decimals) {
            return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
        }

        console.log(f_info.fighter_name + ': ' + f_info.event_fighters[0]);

        // Days Since Last Fight
        const one_day = 24*60*60*1000;
        const one_year = one_day * 365;
        const event_date = f_info.event_fighters[0].event.event_date.split('-');
        const last_fight = f_info.records[0].date.split('-');
        const event_date_format = new Date(event_date[0],event_date[1],event_date[2]);
        const last_fight_format = new Date(last_fight[0], last_fight[1], last_fight[2]);
        f_info.days_last_fight = Math.round(Math.abs((event_date_format.getTime() - last_fight_format.getTime())/(one_day)));

        for (let i = 0, dlw_flag = false, dll_flag = false; i < f_info.records.length; i++) {

            // Days Since Last Win
            if (f_info.records[i].result === 'win' && dlw_flag === false) {
                const last_win = f_info.records[i].date.split('-');
                const last_win_format = new Date(last_win[0], last_win[1], last_win[2]);
                f_info.days_last_win = Math.round(Math.abs((event_date_format.getTime() - last_win_format.getTime())/(one_day)));
                dlw_flag = true;
            }

            // Days Since Last Loss
            if (f_info.records[i].result === 'loss' && dll_flag === false) {
                const last_loss = f_info.records[i].date.split('-');
                const last_loss_format = new Date(last_loss[0], last_loss[1], last_loss[2]);
                f_info.days_last_loss = Math.round(Math.abs((event_date_format.getTime() - last_loss_format.getTime())/(one_day)));
                dll_flag = true;
            }

            // UFC Experience
            if (f_info.records[i].name.includes('UFC')) {
                f_info.ufc_fights++
            }

            // Total MMA Rounds
            f_info.mma_rounds = f_info.mma_rounds + parseInt(f_info.records[i].round);

            // MMA Career Length
            first_year = f_info.records[i].date.split('-');
        }


        // MMA Career Length
        const first_year_format = new Date(first_year[0], first_year[1], first_year[2]);
        f_info.years_mma_career = Math.round(Math.abs((event_date_format.getTime() - first_year_format.getTime())/(one_year)));

        // Coming Off A Loss
        let off_loss = f_info.records[0].result;
        off_loss === 'loss' ? f_info.off_loss = 'yes' : f_info.off_loss = 'no';

        // Average Rounds
        f_info.year_avg_rounds = round(f_info.mma_rounds / f_info.years_mma_career, 1);


        resolve(f_info);
    })
};