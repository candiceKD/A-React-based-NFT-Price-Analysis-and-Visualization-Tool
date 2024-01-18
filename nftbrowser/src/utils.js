const origin = "https://deep-index.moralis.io";
const apiKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6IjkyOWQ5ZDI4LTA0MTMtNGRlMC05NDdiLWU3Yzg5OWJlZjE2MSIsIm9yZ0lkIjoiMzYzNDU3IiwidXNlcklkIjoiMzczNTM5IiwidHlwZUlkIjoiMDAzNmVkNTYtZTU1YS00MGU5LWFkMTctMzcxODRlZTkxNjk5IiwidHlwZSI6IlBST0pFQ1QiLCJpYXQiOjE2OTkyMjQyNTYsImV4cCI6NDg1NDk4NDI1Nn0.jycJDinC4ArofDXKqZeuUiRiodzO75p0bkm_TCtMpds";

export const getContractNFTs = async (tokenAddress) => {
  //通过contract的tokenAddress去找到遵循这个contract的NFT有哪些
  //去一个博物馆去找所有的收藏品, 给一个限制是20个, tokenAddress是博物馆的地址, 是Contract的地址
  const url = new URL(`${origin}/api/v2/nft/${tokenAddress}`);
  url.searchParams.append("chain", "eth");
  url.searchParams.append("format", "decimal");
  url.searchParams.append("limit", "20");

  //之前fetch返回的是responseStatus, async和await必须同时出现, 就是把.then这种写法拍平
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  });

  return response.json();
  //.json的作用就是把后端发回来的json流数据 stream立体化成一个json object
};

//把这个contract的交易给拿出来, moralis只允许把整个博物馆的交易给拿出来
//交易记录可能会有一个限制, 比如最近一个月的100条交易记录
//通过contract的tokenAddress去找到遵从这个contract的NFT的交易记录
export const getContractTrades = async (tokenAddress) => {
  const url = new URL(`${origin}/api/v2/nft/${tokenAddress}/trades`);
  url.searchParams.append("chain", "eth");
  url.searchParams.append("marketplace", "opensea");
  url.searchParams.append("limit", "20");

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  });

  return response.json();
};

//对这个博物馆的某一个展品的转账记录,钻进去盯着看
//对某一个contract的某一个NFT的transfer
export const getNFTTransfers = async (tokenAddress, tokenId) => {
  const url = new URL(
    `${origin}/api/v2/nft/${tokenAddress}/${tokenId}/transfers`
  );
  url.searchParams.append("chain", "eth");
  url.searchParams.append("format", "decimal");
  url.searchParams.append("limit", "20");

  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      "X-API-KEY": apiKey,
    },
  });

  return response.json();
};
