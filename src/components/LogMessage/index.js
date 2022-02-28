import './style.css';
import { padStart, levelToString } from './utils';

const Stamp = ({ stamp }) => {
  return (
    <span>
      {padStart(stamp.secs, 10)}.{padStart(stamp.nsecs, 9)}
    </span>
  );
};

const LogMessage = ({ message }) => {
  const { file, msg, name, header, level, line } = message;

  const lines = msg.split('\n');
  const altStr = `${file}:${line}`;
  const strLevel = levelToString(level);
  const levelClassName = strLevel.toLocaleLowerCase();

  return (
    <div title={altStr} className={`container ${levelClassName}`}>
      <div>
        <span>[{_.padStart(strLevel, 5, ' ')}]</span>
        <span>
          [<Stamp stamp={header.stamp} />]
        </span>
        <span>[{name}]:</span>
        <span>&nbsp;</span>
        <span>{lines[0]}</span>
      </div>
      <div>
        {lines.slice(1).map((line, idx) => {
          return (
            <div key={idx}>
              &nbsp;&nbsp;&nbsp;&nbsp;
              {line}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LogMessage;
