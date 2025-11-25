import Slider from '../../components/slider';
import './styles/index.scss';

import { historicalEvents } from './mock';

function Main() {
  return (
    <main className='main'>
      <div className='main__container'>
        <section className='historical-dates'>
          <h1 className='historical-dates__title'>Исторические даты</h1>
          <Slider historicalEvents={historicalEvents} />
        </section>
      </div>
    </main>
  );
}

export default Main;
