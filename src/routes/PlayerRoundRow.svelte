<script>
    import { TableBodyCell, TableBodyRow } from 'flowbite-svelte';

    export let round;
</script>

<TableBodyRow>
    <TableBodyCell tdClass="w-2"><img src={round.player.image_url} alt={round.player.name} style="width: 60px; height: 40px;"/></TableBodyCell>
    <TableBodyCell tdClass="w-2">{round.player.name}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.price}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.position}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.fantasy_points_total}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.minutes_played}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.points}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.tries}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.conversions}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.conversion_attempts}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.penalty_goals}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.goal_conversion_rate}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.one_point_field_goals}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.two_point_field_goals}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.all_runs}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.all_run_meters}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.kick_return_meters}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.post_contact_meters}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.line_breaks}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.line_break_assists}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.try_assists}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.line_engaged_runs}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.tackle_breaks}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.play_the_ball}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.dummy_half_runs}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.dummy_half_run_meters}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.one_on_one_steal}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.offloads}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.dummy_passes}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.passes}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.receipts}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.passes_to_run_ratio}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.tackle_efficiency}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.tackles_made}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.missed_tackles}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.ineffective_tackles}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.intercepts}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.kicks_defused}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.kicks}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.kick_meters}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.bomb_kicks}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.grubber_kicks}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.forty_twenties}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.twenty_forties}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.cross_field_kicks}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.kicks_dead}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.handling_errors}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.one_on_one_lost}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.penalties}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.ruck_infringements}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.on_report}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.sin_bins}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.send_offs}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.hit_ups}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.field_goals}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.forced_drop_out_kicks}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.goals}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.hit_up_run_meters}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.offside_within_ten_meters}</TableBodyCell>
    <TableBodyCell tdClass="px-2">{round.play_the_ball_average_speed}</TableBodyCell>
</TableBodyRow>