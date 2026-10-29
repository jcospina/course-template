SELECT category, SUM(stock) AS units FROM items GROUP BY category ORDER BY category;
