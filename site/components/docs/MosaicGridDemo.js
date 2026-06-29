import styles from "./MosaicGridDemo.module.css";

const TILES = [
  { area: "a", angle: 25 },
  { area: "b", angle: 95 },
  { area: "c", angle: 160 },
];

export default function MosaicGridDemo() {
  return (
    <div className={styles.grid}>
      {TILES.map((t) => (
        <div
          key={t.area}
          className={styles[`tile${t.area}`]}
          style={{ backgroundImage: `linear-gradient(${t.angle}deg, #FFD600, #FF7A00, #FF0169, #D300C5, #7638FA)` }}
        />
      ))}
    </div>
  );
}
