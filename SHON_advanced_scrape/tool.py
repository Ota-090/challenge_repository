# 返回唯一的xpath结果
def xpath_one(contentx, path, default=None):
    rets = contentx.xpath(path)
    return rets[0] if rets else default


# 返回多个xpath的结果
def xpath_all(contentx, path):
    rets = contentx.xpath(path)
    return rets


def xpath_union(contentx, path, split='', default=None):
    ret = split.join( [ ret.strip() for ret in contentx.xpath(path) ])
    return ret if ret else default




