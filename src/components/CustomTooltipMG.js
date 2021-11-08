export default function CustomTooltipMG({ data }) {
    return (
      <div className="body-tooltip">
        {data.map((linha, id) => {
          return linha && <div key={id}>{linha}</div>;
        })}
      </div>
    );
  }
  