import { render, screen } from "@testing-library/react";

import Card from "./card";

it('Componente Card', () => {
    const recipe = {
        title: 'milanga de pollo',
        image: 'https://i.ytimg.com/vi/pecKFzpJ20A/hqdefault.jpg',
        diets: ['vegan', 'ketogenic']
    }
    const componenteTest=render(<Card title={recipe.title} image={recipe.image} diets={recipe.diets}></Card>)
    expect(componenteTest.container).toHaveTextContent(recipe.title)
})

