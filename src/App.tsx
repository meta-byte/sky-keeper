import { FlavorLog } from "./components/FlavorLog.tsx";
import { Hud } from "./components/Hud.tsx";
import { MissionOverlay } from "./components/MissionOverlay.tsx";
import { Scope } from "./components/Scope.tsx";
import { TelemetryPanel } from "./components/TelemetryPanel.tsx";
import { WinSplash } from "./components/WinSplash.tsx";
import { bra, selectedTrack } from "./game/selectors.ts";
import { useSortie } from "./hooks/useSortie.ts";

function App() {
  const { state, paused, speed, canSlow, canSpeed, togglePause, slower, faster, select, classify, reset } =
    useSortie();
  const track = selectedTrack(state);

  return (
    <div className="flex min-h-svh items-center justify-center bg-slate-950">
      <div
        className={`relative flex h-[90vh] w-[90vw] flex-col overflow-hidden border border-emerald-500/30 bg-slate-950 font-mono text-emerald-400 ${paused ? "[&_.radar-sweep]:[animation-play-state:paused]" : ""}`}
      >
        <Hud
          score={state.score}
          vipHealth={state.vip.health}
          playerHealth={state.player.health}
          paused={paused}
          speed={speed}
          canSlow={canSlow}
          canSpeed={canSpeed}
          onTogglePause={togglePause}
          onSlower={slower}
          onFaster={faster}
        />
        <main className="grid min-h-0 flex-1 grid-rows-[3fr_1fr] md:grid-cols-[3fr_1fr] md:grid-rows-1">
          <section className="relative flex min-h-0 items-center justify-center border-b border-emerald-500/20 p-3 [container-type:size] md:border-r md:border-b-0 md:p-4">
            <Scope
              vip={state.vip}
              player={state.player}
              bogeys={state.bogeys}
              missiles={state.missiles}
              selectedId={state.selectedId}
              onSelect={select}
            />
            <FlavorLog lines={state.lines} />
          </section>
          <TelemetryPanel
            track={track}
            bra={bra(state)}
            onClassify={(role) => {
              if (track) classify(track.id, role);
            }}
          />
        </main>
        {state.failure === "delivered" ? (
          <WinSplash onReset={reset} />
        ) : (
          <MissionOverlay failure={state.failure} onReset={reset} />
        )}
      </div>
    </div>
  );
}

export default App;
