import { Card } from 'flowbite-react';

export const Dashboard = () => {
  const cards = [
    { title: 'Card 1', description: 'Description for card 1' },
    { title: 'Card 2', description: 'Description for card 2' },
    { title: 'Card 3', description: 'Description for card 3' },
    { title: 'Card 4', description: 'Description for card 4' },
    { title: 'Card 5', description: 'Description for card 5' },
    { title: 'Card 6', description: 'Description for card 6' },
  ];

  return (
    <section>
      <div className='flex'>
        {cards.map((card, index) => (
          <Card key={index}>
            <h2>{card.title}</h2>
            <p>{card.description}</p>
          </Card>
        ))}
      </div>
    </section>
  );
};
